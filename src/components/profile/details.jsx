import { useState } from "react";
import { useProfile } from "../../hooks/useProfile";
import Modal from "../common/modal";
import ProfileUpdate from "./update";
import ChangePassword from "./changePassword";

export default function ProfileDetails() {
  const { data, isLoading, isError, error, refetch } = useProfile();
  const [activeModal, setActiveModal] = useState(null); // "edit" | "password" | null

  if (isLoading) {
    return (
      <div className="grid md:grid-cols-[280px_1fr] gap-10">
        <div className="animate-pulse space-y-4">
          <div className="w-28 h-28 bg-black/10 dark:bg-white/10" />
          <div className="h-4 w-32 bg-black/10 dark:bg-white/10" />
        </div>
      </div>
    );
  }

  if (isError) {
    return (
      <div className="max-w-sm py-12">
        <p className="text-sm text-black/60 dark:text-white/60 mb-4">
          Couldn't load your profile{error.response?.status ? ` (${error.response.status})` : ""}.
        </p>
        <button
          onClick={() => refetch()}
          className="text-xs font-semibold uppercase tracking-widest border border-black dark:border-white px-5 py-2.5 text-black dark:text-white hover:bg-black hover:text-white dark:hover:bg-white dark:hover:text-black transition-colors"
        >
          Try again
        </button>
      </div>
    );
  }

  const user = data.user || data;

  return (
    <>
      <div className="grid md:grid-cols-[280px_1fr] gap-x-16 gap-y-12">
        <div className="flex flex-col items-start gap-5">
          <div className="w-28 h-28 border border-black/10 dark:border-white/10 overflow-hidden bg-black/5 dark:bg-white/5">
            {user.profileImage?.url ? (
              <img src={user.profileImage.url} alt={user.name} className="w-full h-full object-cover" />
            ) : (
              <div className="w-full h-full flex items-center justify-center text-3xl font-bold text-black/30 dark:text-white/30">
                {user.name?.charAt(0).toUpperCase()}
              </div>
            )}
          </div>
          <div>
            <p className="text-lg font-semibold text-black dark:text-white">{user.name}</p>
            <p className="text-sm text-black/50 dark:text-white/50">{user.email}</p>
          </div>
          {"isVerified" in user && (
            <span
              className={`inline-block px-2.5 py-1 text-xs font-semibold uppercase tracking-widest ${
                user.isVerified
                  ? "bg-[#FFC400] text-black"
                  : "border border-black/30 dark:border-white/30 text-black/50 dark:text-white/50"
              }`}
            >
              {user.isVerified ? "Verified" : "Not verified"}
            </span>
          )}
        </div>

        <div className="space-y-12">
          <section>
            <h2 className="text-xs font-semibold uppercase tracking-widest text-black/40 dark:text-white/40 mb-5">
              Account details
            </h2>
            <dl className="space-y-5 max-w-md">
              <div className="flex items-center justify-between border-b border-black/10 dark:border-white/10 pb-3">
                <dt className="text-sm text-black/50 dark:text-white/50">Name</dt>
                <dd className="text-sm text-black dark:text-white">{user.name}</dd>
              </div>
              <div className="flex items-center justify-between border-b border-black/10 dark:border-white/10 pb-3">
                <dt className="text-sm text-black/50 dark:text-white/50">Email</dt>
                <dd className="text-sm text-black dark:text-white">{user.email}</dd>
              </div>
              {user.role && (
                <div className="flex items-center justify-between border-b border-black/10 dark:border-white/10 pb-3">
                  <dt className="text-sm text-black/50 dark:text-white/50">Role</dt>
                  <dd className="text-sm text-black dark:text-white capitalize">{user.role}</dd>
                </div>
              )}
            </dl>
          </section>

          <section>
            <h2 className="text-xs font-semibold uppercase tracking-widest text-black/40 dark:text-white/40 mb-5">
              Manage
            </h2>
            <div className="flex flex-wrap gap-4">
              <button
                onClick={() => setActiveModal("edit")}
                className="text-xs font-semibold uppercase tracking-widest bg-black dark:bg-white text-white dark:text-black px-5 py-2.5 hover:bg-[#FFC400] hover:text-black transition-colors"
              >
                Edit profile
              </button>
              <button
                onClick={() => setActiveModal("password")}
                className="text-xs font-semibold uppercase tracking-widest border border-black dark:border-white px-5 py-2.5 text-black dark:text-white hover:bg-black hover:text-white dark:hover:bg-white dark:hover:text-black transition-colors"
              >
                Change password
              </button>
            </div>
          </section>
        </div>
      </div>

      <Modal
        isOpen={activeModal === "edit"}
        onClose={() => setActiveModal(null)}
        title="Edit profile"
        footer={
          <>
            <button
              onClick={() => setActiveModal(null)}
              className="text-xs font-semibold uppercase tracking-widest px-4 py-2 border border-black dark:border-white text-black dark:text-white"
            >
              Cancel
            </button>
            <button
              type="submit"
              form="profile-update-form"
              className="text-xs font-semibold uppercase tracking-widest px-4 py-2 bg-black dark:bg-white text-white dark:text-black"
            >
              Save changes
            </button>
          </>
        }
      >
        <ProfileUpdate onClose={() => setActiveModal(null)} />
      </Modal>

      <Modal
        isOpen={activeModal === "password"}
        onClose={() => setActiveModal(null)}
        title="Change password"
        footer={
          <>
            <button
              onClick={() => setActiveModal(null)}
              className="text-xs font-semibold uppercase tracking-widest px-4 py-2 border border-black dark:border-white text-black dark:text-white"
            >
              Cancel
            </button>
            <button
              type="submit"
              form="change-password-form"
              className="text-xs font-semibold uppercase tracking-widest px-4 py-2 bg-black dark:bg-white text-white dark:text-black"
            >
              Update password
            </button>
          </>
        }
      >
        <ChangePassword onClose={() => setActiveModal(null)} />
      </Modal>
    </>
  );
}
