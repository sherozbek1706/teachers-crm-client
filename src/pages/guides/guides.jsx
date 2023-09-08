export const Guides = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axiosInstance
      .get("/guides")
      .then(({ data: { data: data } }) => {
        setData(data);
        setLoading(false);
      })
      .catch((err) => {
        HandleFetchError(err);
      });
  }, []);

  return (
    <div className="Guides__dashboard">
    </div>
  );
};
