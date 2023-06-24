const CampaignTitle = () => {
  return (
    <div className="flex flex-row items-center justify-between px-4 py-6">
      <div className="flex flex-col justify-between">
        <div className="text-[2rem] font-bold">Campaign</div>
        <div className="text-neutral-400 mt-4">
          Views the lists of your categorized campaigns
        </div>
      </div>
      <div className="flex flex-row">
        <div className="text-neutral-400">Administrator&nbsp;</div>
        <div className="">/&nbsp;Campaign</div>
      </div>
    </div>
  );
};

export { CampaignTitle };
