import {OrganizationProfile} from "@clerk/nextjs";

export default async function Members() {
  return (
    <main className="flex flex-1 flex-col gap-4 p-4 lg:gap-6 lg:p-6">
      <div className="flex items-center">
        <h1 className="text-lg font-semibold md:text-2xl">Members</h1>
      </div>
      <div className="flex flex-1 items-center justify-center">
        <OrganizationProfile routing="virtual"/>
      </div>
    </main>
  );
}