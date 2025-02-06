import { Editor } from "./editor";

interface Props {
  params: { documentId: string };
}
const Page: React.FC<Props> = async ({ params }) => {
  const { documentId } = await params;

  return (
    <div className="min-h-screen bg-[#fafbfd]">
      <Editor />
    </div>
  );
};

export default Page;
