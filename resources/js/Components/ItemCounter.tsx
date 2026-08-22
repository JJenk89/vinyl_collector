

const ItemCounter = ({ itemLength, context }: { itemLength: any[]; context: string }) => {
    return ( 
        <p className="text-sm text-gray-300 font-mono text-center m-6">
            {itemLength.length} items in your {context}
        </p>
     );
}
 
export default ItemCounter;