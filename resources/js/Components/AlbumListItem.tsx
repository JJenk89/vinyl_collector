import { Album, AlbumCardProps } from "./AlbumCard";
import { Link } from '@inertiajs/react';
import DeleteButton from "./DeleteButton";
import PrimaryButton from "./PrimaryButton";

const AlbumListItem = ({ album, dialogAlbumId, onShowDeleteDialog, onCloseDeleteDialog, onDelete, context }: AlbumCardProps) => {
    return ( 
        <div className="album-list-item">
            <table className="border border-indigo-700 w-full text-left max-w-screen-lg mx-auto">
                <tbody className="text-gray-300 font-mono">
                    <tr>
                        <th>Album</th>
                        <th>Artist</th>
                        <th>Label</th>
                        <th></th>
                        <th></th>
                    </tr>
                    {album.map((album: Album) => (
                        <>
                            
                            <dialog
                                key={`dialog-${album.album_id}`}
                                className="bg-neutral-950 border-2 border-red-600 rounded-md p-6 text-gray-300 z-50 backdrop:bg-gray-900 backdrop:opacity-70"
                                id={`delete-dialog-${album.album_id}`}
                                open={dialogAlbumId === album.album_id}
                                onClose={() => onCloseDeleteDialog(album)}
                            >
                                <p>
                                    Are you sure you want to delete{' '}
                                    <span className="font-bold">{album.title}</span>{' '}
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

                            <tr key={album.album_id} className="border border-indigo-600 text-left">
                                <td>{album.title}</td>
                                <td>{album.artist}</td>
                                <td>{album.label || "N/A"}</td>
                                <td>
                                    <PrimaryButton>
                                        <Link href={`/album/${album.album_id}`}>View</Link>
                                    </PrimaryButton>
                                </td>
                                <td>
                                    <DeleteButton onClick={() => onShowDeleteDialog(album)}>
                                        Delete
                                    </DeleteButton>
                                </td>
                            </tr>
                        </>
                    ))}
                </tbody>
            </table>
        </div>
    );
}
 
export default AlbumListItem;