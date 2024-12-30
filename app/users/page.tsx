import EmptyState from "../components/empty-state";

const user = () => {
  return (
    <div className="hidden lg:block lg:pl-80 h-full">
      <EmptyState />
    </div>
  );
};

export default user;