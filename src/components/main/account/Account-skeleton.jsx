import { MoreHorizontal } from "lucide-react";
import { Skeleton } from "../../ui/skeleton";

const AccountSkeleton = () => {
  return (
    <div className="w-full bg-gray-300 rounded-3xl p-6">
      <div>
        <div className="flex justify-end">
          <div className="flex items-center justify-center w-5 h-2 overflow-hidden">
            <MoreHorizontal className="stroke-1 fill-[#5f565c] text-[#5f565c]" />
          </div>
        </div>
        <div className="flex items-center gap-3">
          <Skeleton className="w-9 h-9 rounded-full"></Skeleton>
          <div className="flex flex-col gap-1">
            <Skeleton className="w-20 h-5"></Skeleton>
            <Skeleton className="w-28 h-7"></Skeleton>
          </div>
        </div>
      </div>
      <div className="flex justify-end items-center">
        <Skeleton className="w-16 h-8 rounded-3xl"></Skeleton>
      </div>
    </div>
  );
};

export default AccountSkeleton;
