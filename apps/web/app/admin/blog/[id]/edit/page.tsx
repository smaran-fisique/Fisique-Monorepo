import { BlogEditorClient } from '@/components/admin/BlogEditorClient';

export default function EditBlogPage({ params }: { params: { id: string } }) {
  return <BlogEditorClient postId={params.id} />;
}
