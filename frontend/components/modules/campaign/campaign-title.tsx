import dynamic from "next/dynamic";

const PageTitle = dynamic(
  () => import("@/components/modules/page-title/page-title"),
);

const CampaignTitle = () => {
  return (
    <PageTitle
      title="Campaign"
      description="Views the lists of your categorized campaigns"
    />
  );
};

export { CampaignTitle as default };
