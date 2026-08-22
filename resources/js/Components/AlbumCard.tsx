import { Link } from '@inertiajs/react';
import PrimaryButton from './PrimaryButton';
import DeleteButton from './DeleteButton';
import { View } from './ViewToggle';

export type Album = {
    albums: Album[];
    album_id: number;
    title: string;
    label: string | null;
    artist: string;
    cover_url: string;
};

export type AlbumCardProps = {
    albums: Album | any;
    dialogAlbumId: number | null;
    context: 'wishlist' | 'collection';
    view: View;
    onShowDeleteDialog: (album: Album) => void;
    onCloseDeleteDialog: (album: Album) => void;
    onDelete: (album: Album) => void;
}

const AlbumCard = ({
    albums,
    dialogAlbumId,
    context,
    view,
    onShowDeleteDialog,
    onCloseDeleteDialog,
    onDelete
}: AlbumCardProps) => {
    const isList = view === 'list';

    return (
        <div
            className={
                isList
                    ? "bg-neutral-950 border border-indigo-700 rounded-md px-4 py-3 flex items-center justify-between gap-4 w-full"
                    : "bg-neutral-950 shadow-md rounded-lg p-4 border border-indigo-700 max-h-full flex flex-col justify-between"
            }
        >
            <dialog
                className="bg-neutral-950 border-2 border-red-600 rounded-md p-6 text-gray-300 z-50 backdrop:bg-gray-900 backdrop:opacity-70"
                id={`delete-dialog-${albums.album_id}`}
                open={dialogAlbumId === albums.album_id}
                onClose={() => onCloseDeleteDialog(albums)}
            >
                <p>
                    Are you sure you want to delete{' '}
                    <span className="font-bold">{albums.title}</span>{' '}
                    from your {context}?
                </p>
                <div className="flex justify-end gap-4 mt-4">
                    <PrimaryButton onClick={() => onCloseDeleteDialog(albums)}>
                        Cancel
                    </PrimaryButton>
                    <DeleteButton onClick={() => onDelete(albums)}>
                        Delete
                    </DeleteButton>
                </div>
            </dialog>

            {isList ? (
                <>
                    <div className="flex flex-col min-w-0 font-mono">
                        <h2 className="text-lg font-semibold truncate">{albums.title}</h2>
                        <p className="text-gray-500 text-sm truncate">{albums.artist}</p>
                    </div>

                    <div className="flex gap-4 shrink-0">
                        <PrimaryButton>
                            <Link className="h-full w-full flex items-center justify-center" href={`/album/${albums.album_id}`}>
                                View
                            </Link>
                        </PrimaryButton>
                        <DeleteButton onClick={() => onShowDeleteDialog(albums)}>
                            Delete
                        </DeleteButton>
                    </div>
                </>
            ) : (
                <>
                    <div className="text-center flex flex-col content-center items-center mb-4">
                        <h2 className="text-xl font-semibold">{albums.title}</h2>
                        <p className="text-gray-500 mt-2 mb-2">{albums.artist}</p>
                        <img
                            src={albums.cover_url}
                            alt={`${albums.title} cover`}
                            className="w-min h-48 object-contain border border-yellow-700 rounded-md mb-2 p-1"
                        />
                    </div>

                    <p className="text-gray-500 text-sm pb-2">{albums.label || 'Label not available'}</p>

                    <div className="flex justify-between gap-4">
                        <PrimaryButton>
                            <Link className="h-full w-full flex items-center justify-center" href={`/album/${albums.album_id}`}>
                                View
                            </Link>
                        </PrimaryButton>
                        <DeleteButton onClick={() => onShowDeleteDialog(albums)}>
                            Delete
                        </DeleteButton>
                    </div>
                </>
            )}
        </div>
    );
}

export default AlbumCard;