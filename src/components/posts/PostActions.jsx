import { CommentIcon, LikeIcon, ShareIcon } from "../../constant/images";


export default function PostActions({post}) {
  return (
    <>
      <div className="flex items-center justify-between py-6 lg:px-10 lg:py-8">
        <button className="flex-center gap-2 text-xs font-bold text-[#B8BBBF] hover:text-white lg:text-sm">
          <img src={LikeIcon} alt="Like" />
          <span>Like</span>
        </button>

        <button className="icon-btn space-x-2 px-6 py-3 text-xs lg:px-12 lg:text-sm">
          <img src={CommentIcon} alt="Comment" />
          <span>{post?.comments?.length ?? 0}</span>
        </button>

        <button className="flex-center gap-2 text-xs font-bold text-[#B8BBBF] hover:text-white lg:text-sm">
          <img src={ShareIcon} alt="Share" />
          <span>Share</span>
        </button>
      </div>
    </>
  )
}
