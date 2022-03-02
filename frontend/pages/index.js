export const getServerSideProps = async ({ res }) => {
    res.setHeader("location", `/mitarbeiter/login`);

    res.statusCode = 302;
    res.end();

    return { props: {} };
};

// eslint-disable-next-line react/react-in-jsx-scope
const Index = () => <>Index</>;

export default Index;


