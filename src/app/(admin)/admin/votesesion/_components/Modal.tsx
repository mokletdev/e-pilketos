import { Dispatch, SetStateAction } from "react";
import { FaX } from "react-icons/fa6";
import { toast } from "sonner";
import { upsertVoteSession } from "../../../../../utils/database/voteSession.query";

export default function VoteSessionModal({
  setIsOpenModal,
  data,
}: {
  setIsOpenModal: Dispatch<SetStateAction<boolean>>;
  data?: { id?: string; name?: string; start_time?: Date; end_time?: Date; is_active?: boolean } | null;
}) {
  async function update(formdata: FormData) {
    const toastId = toast.loading("Loading...");
    const result = await upsertVoteSession(data?.id as string, formdata);
    if (!result.error) {
      toast.success(result.message, { id: toastId });
      setIsOpenModal(false);
    } else {
      toast.error(result.message, { id: toastId });
    }
  }

  return (
    <div className="bg-gray-300/50 fixed w-full lg:w-[calc(100%-20rem)] z-10 justify-center items-center top-0 right-0 h-full m-auto">
      <div className="relative p-4 w-full h-full max-w-2xl max-h-full m-auto top-20">
        <div className="relative bg-white rounded-lg">
          <form
            onSubmit={(e) => {
              e.preventDefault();
              const formdata = new FormData(e.currentTarget);
              update(formdata);
            }}
          >
            <div className="flex items-center justify-between p-4 md:p-5 border-b">
              <h3>Vote Session Data</h3>
              <button
                type="button"
                className="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm p-1.5 ml-auto inline-flex items-center transition-all"
                onClick={() => setIsOpenModal(false)}
              >
                <FaX size={16} />
              </button>
            </div>
            <div className="p-4 md:p-5 space-y-4">
              <div className="mb-4">
                <label htmlFor="name" className="block text-sm font-medium text-gray-700">
                  Vote Session Name
                </label>
                <input
                  type="text"
                  name="name"
                  id="name"
                  required
                  defaultValue={data?.name}
                  placeholder="Enter the vote session name"
                  className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                />
              </div>
              <div className="mb-4">
                <label htmlFor="start_time" className="block text-sm font-medium text-gray-700">
                  Start Time
                </label>
                <input
                  type="datetime-local"
                  name="start_time"
                  id="start_time"
                  required
                  defaultValue={data?.start_time ? new Date(data.start_time).toISOString().substring(0, 16) : ''}
                  className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                />
              </div>
              <div className="mb-4">
                <label htmlFor="end_time" className="block text-sm font-medium text-gray-700">
                  End Time
                </label>
                <input
                  type="datetime-local"
                  name="end_time"
                  id="end_time"
                  required
                  defaultValue={data?.end_time ? new Date(data.end_time).toISOString().substring(0, 16) : ''}
                  className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                />
              </div>
              <div className="mb-4">
                <label htmlFor="is_active" className="block text-sm font-medium text-gray-700">
                  Is Active
                </label>
                <select
                  name="is_active"
                  id="is_active"
                  required
                  defaultValue={data?.is_active?.toString()}
                  className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                >
                  <option value="false">No</option>
                  <option value="true">Yes</option>
                </select>
              </div>
            </div>
            <div className="flex items-center p-4 md:p-5 border-t border-gray-200 rounded-b justify-end">
              <button
                type="submit"
                className="bg-indigo-600 text-white px-4 py-2 rounded-md hover:bg-indigo-700 transition-all"
              >
                Submit
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
