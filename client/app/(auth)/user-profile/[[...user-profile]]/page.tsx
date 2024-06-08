import { UserProfile } from "@clerk/nextjs";

const UserProfilePage = () => (
    <div className="min-h-screen flex justify-center items-center py-9 px-3">
        <UserProfile path="/user-profile" routing="path" />
    </div>
);

export default UserProfilePage;