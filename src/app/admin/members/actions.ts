'use server';

import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';
import { prisma } from '@/lib/prisma';
import { getSupabaseAdmin, MEMBERS_BUCKET } from '@/lib/supabase-admin';
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
    .from(MEMBERS_BUCKET)
    .upload(path, file, { contentType: file.type });

  if (error) throw new Error(`Upload gagal: ${error.message}`);

  const { data } = supabaseAdmin.storage.from(MEMBERS_BUCKET).getPublicUrl(path);
  return data.publicUrl;
}

function readFields(formData: FormData) {
  return {
    handle: formData.get('handle') as string,
    name: formData.get('name') as string,
    fid: formData.get('fid') as string,
    fen: formData.get('fen') as string,
    bioId: formData.get('bioId') as string,
    bioEn: formData.get('bioEn') as string,
    link: formData.get('link') as string,
    order: Number(formData.get('order')) || 0,
  };
}

export async function createMember(formData: FormData) {
  await requireAuth();

  const imageFile = formData.get('imageFile') as File | null;
  const existingImg = formData.get('img') as string;

  let img = existingImg;
  if (imageFile && imageFile.size > 0) {
    img = await uploadImage(imageFile);
  }
  if (!img) throw new Error('Foto wajib diisi');

  await prisma.member.create({
    data: { img, ...readFields(formData) },
  });

  revalidatePath('/admin/members');
  revalidatePath('/members');
  redirect('/admin/members');
}

export async function updateMember(id: string, formData: FormData) {
  await requireAuth();

  const imageFile = formData.get('imageFile') as File | null;
  const existingImg = formData.get('img') as string;

  let img = existingImg;
  if (imageFile && imageFile.size > 0) {
    img = await uploadImage(imageFile);
  }

  await prisma.member.update({
    where: { id },
    data: { img, ...readFields(formData) },
  });

  revalidatePath('/admin/members');
  revalidatePath('/members');
  redirect('/admin/members');
}

export async function deleteMember(id: string) {
  await requireAuth();
  await prisma.member.delete({ where: { id } });
  revalidatePath('/admin/members');
  revalidatePath('/members');
}
