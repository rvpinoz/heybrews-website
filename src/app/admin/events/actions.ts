'use server';

import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';
import { prisma } from '@/lib/prisma';
import { getSupabaseAdmin, EVENTS_BUCKET } from '@/lib/supabase-admin';
import { auth } from '@/auth';

async function requireAuth() {
  const session = await auth();
  if (!session?.user) throw new Error('Unauthorized');
  return session;
}

function slugify(str: string) {
  return str
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/(^-|-$)/g, '');
}

async function uploadImage(file: File): Promise<string> {
  const ext = file.name.split('.').pop();
  const path = `${Date.now()}-${Math.random().toString(36).slice(2)}.${ext}`;

  const supabaseAdmin = getSupabaseAdmin();
  const { error } = await supabaseAdmin.storage
    .from(EVENTS_BUCKET)
    .upload(path, file, { contentType: file.type });

  if (error) throw new Error(`Upload gagal: ${error.message}`);

  const { data } = supabaseAdmin.storage.from(EVENTS_BUCKET).getPublicUrl(path);
  return data.publicUrl;
}

export async function createEvent(formData: FormData) {
  await requireAuth();

  const titleId = formData.get('titleId') as string;
  const imageFile = formData.get('imageFile') as File | null;
  const existingImg = formData.get('img') as string;

  let img = existingImg;
  if (imageFile && imageFile.size > 0) {
    img = await uploadImage(imageFile);
  }

  if (!img) throw new Error('Gambar wajib diisi');

  await prisma.event.create({
    data: {
      slug: slugify(titleId),
      img,
      date: new Date(formData.get('date') as string),
      titleId,
      titleEn: formData.get('titleEn') as string,
      descId: formData.get('descId') as string,
      descEn: formData.get('descEn') as string,
      tagId: formData.get('tagId') as string,
      tagEn: formData.get('tagEn') as string,
    },
  });

  revalidatePath('/admin/events');
  revalidatePath('/');
  revalidatePath('/events');
  redirect('/admin/events');
}

export async function updateEvent(id: string, formData: FormData) {
  await requireAuth();

  const imageFile = formData.get('imageFile') as File | null;
  const existingImg = formData.get('img') as string;

  let img = existingImg;
  if (imageFile && imageFile.size > 0) {
    img = await uploadImage(imageFile);
  }

  await prisma.event.update({
    where: { id },
    data: {
      img,
      date: new Date(formData.get('date') as string),
      titleId: formData.get('titleId') as string,
      titleEn: formData.get('titleEn') as string,
      descId: formData.get('descId') as string,
      descEn: formData.get('descEn') as string,
      tagId: formData.get('tagId') as string,
      tagEn: formData.get('tagEn') as string,
    },
  });

  revalidatePath('/admin/events');
  revalidatePath('/');
  revalidatePath('/events');
  redirect('/admin/events');
}

export async function deleteEvent(id: string) {
  await requireAuth();
  await prisma.event.delete({ where: { id } });
  revalidatePath('/admin/events');
  revalidatePath('/');
}
