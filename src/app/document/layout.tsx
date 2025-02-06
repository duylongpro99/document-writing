interface Props {
  children: React.ReactNode;
}

const DocumentLayout: React.FC<Props> = ({ children }) => {
  return <div className="flex flex-col gap-y-4">{children}</div>;
};

export default DocumentLayout;
