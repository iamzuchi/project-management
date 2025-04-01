import { useState } from "react";
import {
  useGetCommentsByTaskQuery,
  useAddCommentMutation,
  useUpdateCommentMutation,
  useDeleteCommentMutation,
} from "@/state/api";
import Modal from "@/components/Modal";

interface CommentSectionModalProps {
  taskId: number;
  userId: number;
  isOpen: boolean;
  onClose: () => void;
  name: string;
}

const CommentSectionModal = ({ taskId, userId, isOpen, onClose, name }: CommentSectionModalProps) => {
  const { data: comments, isLoading, refetch } = useGetCommentsByTaskQuery(taskId, {
    refetchOnMountOrArgChange: true,
  });
  const [createComment] = useAddCommentMutation();
  const [updateComment] = useUpdateCommentMutation();
  const [deleteComment] = useDeleteCommentMutation();

  const [newComment, setNewComment] = useState("");
  const [editing, setEditing] = useState<{ id: number; text: string } | null>(null);

  const handleCreateComment = async () => {
    if (!newComment.trim()) return;
    await createComment({ text: newComment, taskId, userId });
    setNewComment("");
    refetch();
  };

  const handleUpdateComment = async (id: number, text: string) => {
    await updateComment({ commentId: id, text });
    setEditing(null);
    refetch();
  };

  const handleDeleteComment = async (id: number) => {
    await deleteComment(id);
    refetch();
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} name={name}>
      <h3 className="text-lg font-semibold mb-4">Comments</h3>
      {isLoading ? (
        <p>Loading comments...</p>
      ) : (
        <ul className="space-y-2">
          {comments?.map((comment) => (
            <li key={comment.id} className="p-2 border-b flex justify-between items-center">
              {editing?.id === comment.id ? (
                <>
                  <input
                    type="text"
                    className="border p-1 rounded w-full"
                    value={editing.text}
                    onChange={(e) => setEditing({ ...editing, text: e.target.value })}
                  />
                  <button className="text-blue-500 ml-2" onClick={() => handleUpdateComment(comment.id, editing.text)}>Save</button>
                  <button className="text-gray-500 ml-2" onClick={() => setEditing(null)}>Cancel</button>
                </>
              ) : (
                <>
                  <span>{comment.text}</span>
                  {comment.userId === userId && (
                    <div className="flex gap-2">
                      <button className="text-blue-500" onClick={() => setEditing({ id: comment.id, text: comment.text })}>Edit</button>
                      <button className="text-red-500" onClick={() => handleDeleteComment(comment.id)}>Delete</button>
                    </div>
                  )}
                </>
              )}
            </li>
          ))}
        </ul>
      )}
      <div className="mt-4 flex gap-2">
        <input
          type="text"
          className="border p-2 flex-1 rounded"
          placeholder="Write a comment..."
          value={newComment}
          onChange={(e) => setNewComment(e.target.value)}
        />
        <button className="bg-blue-500 text-white px-4 py-2 rounded" onClick={handleCreateComment}>Add</button>
      </div>
    </Modal>
  );
};

export default CommentSectionModal;