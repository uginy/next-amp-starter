import useSWR from "swr";

const fetcher = (url) => fetch(url).then((res) => res.json());
const About = () => {
  const { data, error } = useSWR("/api/exchangeInfo", fetcher);

  if (error) return <div>Failed to load</div>;
  if (!data) return <div>Loading...</div>;
  return (
    <>
      About
      <pre>{JSON.stringify(data, null, 2)}</pre>
    </>
  );
};

export default About;
