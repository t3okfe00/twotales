export default function ProfileHeader() {
  return (
    <div className="flex items-center justify-between p-4 bg-gray-100 border-b">
      <h1 className="text-2xl font-bold">Profile</h1>
      <button className="px-4 py-2 text-sm text-white bg-blue-500 rounded hover:bg-blue-600">
        Edit Profile
      </button>
    </div>
  );
}
