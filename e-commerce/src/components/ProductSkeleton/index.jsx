import Skeleton from "@mui/material/Skeleton";

const ProductSkeleton = () => {
  return (
    <div className="flex gap-4 p-4 bg-white rounded">
      <Skeleton variant="rectangular" width={220} height={260} />
      <div className="flex-1">
        <Skeleton width="40%" />
        <Skeleton width="70%" height={30} />
        <Skeleton width="60%" />
        <Skeleton width="30%" />
      </div>
    </div>
  );
};

export default ProductSkeleton;
