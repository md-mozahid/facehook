import { useState } from 'react'
import {
  DeleteIcon,
  EditIcon,
  ThreeDotsIcon,
  TimeIcon,
} from '../../constant/images'
import { useAvatar } from '../../hooks/useAvatar'
import { getDateDifferenceFromNow } from '../../utils'

export default function PostHeader({ post }) {
  const [showAction, setShowAction] = useState(false)
  const { avatarURL } = useAvatar(post)

  function toggleAction() {
    setShowAction(!showAction)
  }

  return (
    <>
      <header className="flex items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <img
            className="max-w-10 max-h-10 rounded-full lg:max-h-[58px] lg:max-w-[58px]"
            src={avatarURL}
            alt="avatar"
          />
          <div>
            <h6 className="text-lg lg:text-xl">{post?.author?.name}</h6>
            <div className="flex items-center gap-1.5">
              <img src={TimeIcon} alt="time" />
              <span className="text-sm text-gray-400 lg:text-base">
                {`${getDateDifferenceFromNow(post?.createAt)} ago`}
              </span>
            </div>
          </div>
        </div>

        <div className="relative">
          <button onClick={toggleAction}>
            <img src={ThreeDotsIcon} alt="3dots of Action" />
          </button>

          {showAction && (
            <div className="action-modal-container">
              <button className="action-menu-item hover:text-lwsGreen">
                <img src={EditIcon} alt="Edit" />
                Edit
              </button>
              <button className="action-menu-item hover:text-red-500">
                <img src={DeleteIcon} alt="Delete" />
                Delete
              </button>
            </div>
          )}
        </div>
      </header>
    </>
  )
}
