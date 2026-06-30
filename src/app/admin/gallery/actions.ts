'use server';

import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';
import { prisma } from '@/lib/prisma';
import { getSupabaseAdmin, GALLERY_BUCKET } from '@/lib/supabase-admin';
import { auth } from '@/auth';

async function requireAuth() {
  const session = await auth();
  if (!session?.user) throw new Error('Unauthorized');
  return session;
}

async function uploadImage(file: File): Promise<string> {
  const ext = file.name.split('.').pop();
  const path = `${Date.now()}-${Math.random().toString(36).slice(2)}.${ext}`;

  const supabaseAdmin = getSupabaseAdmin();
  const { error } = await supabaseAdmin.storage
    .from(GALLERY_BUCKET)
    .upload(path, file, { contentType: file.type });

  if (error) throw new Error(`Upload gagal: ${error.message}`);

  const { data } = supabaseAdmin.storage.from(GALLERY_BUCKET).getPublicUrl(path);
  return data.publicUrl;
}

function readFields(formData: FormData) {
  return {
    width: Number(formData.get('width')) || 1200,
    height: Number(formData.get('height')) || 800,
    altId: formData.get('altId') as string,
    altEn: formData.get('altEn') as string,
    categoryId: formData.get('categoryId') as string,
    categoryEn: formData.get('categoryEn') as string,
    span: (formData.get('span') as 'sm' | 'md' | 'lg') || 'sm',
  };
}

export async function createGalleryItem(formData: FormData) {
  await requireAuth();

  const imageFile = formData.get('imageFile') as File | null;
  const existingSrc = formData.get('src') as string;

  let src = existingSrc;
  if (imageFile && imageFile.size > 0) {
    src = await uploadImage(imageFile);
  }
  if (!src) throw new Error('Gambar wajib diisi');

  await prisma.galleryItem.create({
    data: { src, ...readFields(formData) },
  });

  revalidatePath('/admin/gallery');
  revalidatePath('/gallery');
  redirect('/admin/gallery');
}

export async function updateGalleryItem(id: string, formData: FormData) {
  await requireAuth();

  const imageFile = formData.get('imageFile') as File | null;
  const existingSrc = formData.get('src') as string;

  let src = existingSrc;
  if (imageFile && imageFile.size > 0) {
    src = await uploadImage(imageFile);
  }

  await prisma.galleryItem.update({
    where: { id },
    data: { src, ...readFields(formData) },
  });

  revalidatePath('/admin/gallery');
  revalidatePath('/gallery');
  redirect('/admin/gallery');
}

export async function deleteGalleryItem(id: string) {
  await requireAuth();
  await prisma.galleryItem.delete({ where: { id } });
  revalidatePath('/admin/gallery');
  revalidatePath('/gallery');
}
