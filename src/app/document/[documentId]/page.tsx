import { Editor } from "./editor";
import { Toolbar } from "./(toolbar)/toolbar";

interface Props {
  params: { documentId: string };
}
const Page: React.FC<Props> = async ({ params }) => {
  const { documentId } = await params;

  return (
    <div className="min-h-screen bg-[#090d16]">
      <Toolbar />
      <Editor />
    </div>
  );
};

export default Page;
