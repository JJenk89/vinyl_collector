import { Link } from '@inertiajs/react';
import PrimaryButton from './PrimaryButton';
import DeleteButton from './DeleteButton';

export type Album = {
    album_id: number;
    name: string;
    artist: string;
    cover_url: string;
};

type AlbumCardProps = {
    album: Album;
    dialogAlbumId: number | null;
    context: 'wishlist' | 'collection';
    onShowDeleteDialog: (album: Album) => void;
    onCloseDeleteDialog: (album: Album) => void;
    onDelete: (album: Album) => void;
}

const AlbumCard = ({
    album,
    dialogAlbumId,
    context,
    onShowDeleteDialog,
    onCloseDeleteDialog,
    onDelete
}: AlbumCardProps) => {
    return ( 
        <div className="bg-neutral-950 shadow-md rounded-lg p-4 border border-indigo-700">

            <dialog
                className="bg-neutral-950 border-2 border-red-600 rounded-md p-6 text-gray-300 z-50 backdrop:bg-gray-900 backdrop:opacity-70"
                id={`delete-dialog-${album.album_id}`}
                open={dialogAlbumId === album.album_id}
                onClose={() => onCloseDeleteDialog(album)}
            >
                <p>
                    Are you sure you want to delete{' '}
                    <span className="font-bold">{album.name}</span>{' '}
                    from your {context}?
                </p>
                <div className="flex justify-end gap-4 mt-4">
                    <PrimaryButton onClick={() => onCloseDeleteDialog(album)}>
                        Cancel
                    </PrimaryButton>
                    <DeleteButton onClick={() => onDelete(album)}>
                        Delete
                    </DeleteButton>
                </div>
            </dialog>

            <div className="text-center flex flex-col content-center items-center mb-4">
                <h2 className="text-xl font-semibold">{album.name}</h2>
                <p className="text-gray-500 mt-2 mb-2">{album.artist}</p>
                <img
                    src={album.cover_url}
                    alt={`${album.name} cover`}
                    className="w-min h-48 object-contain border border-yellow-700 rounded-md mb-2 p-1"
                />
            </div>

            <div className="flex justify-between gap-4">
                <PrimaryButton>
                    <Link href={`/album/${album.album_id}`}>
                        View
                    </Link>
                </PrimaryButton>
                <DeleteButton onClick={() => onShowDeleteDialog(album)}>
                    Delete
                </DeleteButton>
            </div>

        </div>
     );
}
 
export default AlbumCard;