import { Navbar } from "./(navbar)/navbar";
import { Toolbar } from "./(toolbar)/toolbar";
import { Editor } from "./editor";
// import { Room } from "./room";

interface Props {
  params: Promise<{ documentId: string }>;
}
const Page: React.FC<Props> = async ({ params }) => {
  const { documentId } = await params;
  console.info(":Document:", documentId);

  // <Room>
  return (
    <div className="min-h-screen bg-[#fafbfd]">
      <div className="flex flex-col px-4 pt-2 gap-y-2 fixed top-0 left-0 right-0 z-10 bg-[#fafbfd] print:hidden">
        <Navbar />
        <Toolbar />
      </div>

      <div className="pt-[114px] print:pt-0">
        <Editor />
      </div>
    </div>
  );
  {
    /* </Room> */
  }
};

export default Page;
