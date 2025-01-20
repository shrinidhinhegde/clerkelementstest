import {CreateOrganization} from "@clerk/nextjs";

export default function CreateLab() {
  return (
    <main className="flex flex-1 flex-col gap-4 p-4 lg:gap-6 lg:p-6">
      <div className="flex items-center">
        <h1 className="text-lg font-semibold md:text-2xl">Create Lab</h1>
      </div>
      <div
        className="flex h-full flex-col items-center justify-center rounded-lg border border-dashed shadow-sm space-y-10 lg:px-20 md:px-6 sm-px-4 lg:py-20 md:py-10"
      >
        <p className="text-md text-center px-4">Create a new lab and add invite members to collaborate. You can choose
          not to
          create a Lab and ask your lab admin invite you to join their lab.</p>
        <CreateOrganization path="/create-organization" skipInvitationScreen={false} hideSlug={true}/>
      </div>
    </main>
  );
}

