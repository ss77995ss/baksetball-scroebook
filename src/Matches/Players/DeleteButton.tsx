import { useMutation } from 'react-query';
import { PlayerType } from '../types';
import { API_DOMAIN } from '../constants';

const DeleteButton: React.FC<{ player: PlayerType }> = ({ player }: { player: PlayerType }) => {
  const { isLoading, isError, mutate } = useMutation((formData: { playerId: string }) =>
    fetch(`${API_DOMAIN}/players`, {
      method: 'DELETE',
      body: JSON.stringify(formData),
      headers: {
        'Content-Type': 'application/json',
      },
    }),
  );

  const onDelete = (): void => {
    if (window.confirm(`刪除球員：${player.name}？`)) {
      mutate({
        playerId: player._id,
      });
    }
  };

  return (
    <>
      <button type="submit" onClick={onDelete} disabled={isLoading}>
        刪除
      </button>
      {isError && <div>Something went wrong</div>}
    </>
  );
};

export default DeleteButton;
