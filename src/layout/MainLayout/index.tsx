interface Props {
  children: React.ReactNode;
}

const MainLayout = ({ children }: Props) => {
  return (
    <>
      Main Layout <br />
      {children}
    </>
  );
};

export default MainLayout;
