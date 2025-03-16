export const ProductTabs = ({
    activeTab,
    setActiveTab,
    reviewCount,
    children
  }: {
    activeTab: string;
    setActiveTab: (tab: string) => void;
    reviewCount: number;
    children: React.ReactNode;
  }) => (
    <div className="max-w-5xl mx-auto p-4 md:p-6">
      <div className="flex border-b">
        <TabButton
          active={activeTab === "description"}
          onClick={() => setActiveTab("description")}
        >
          Mô tả sản phẩm
        </TabButton>
        <TabButton
          active={activeTab === "reviews"}
          onClick={() => setActiveTab("reviews")}
        >
          Đánh giá ({reviewCount})
        </TabButton>
      </div>
      
      <div className="pt-6">
        {children}
      </div>
    </div>
  );
  
  const TabButton = ({ 
    active, 
    onClick, 
    children 
  }: {
    active: boolean;
    onClick: () => void;
    children: React.ReactNode;
  }) => (
    <button
      type="button"
      className={`flex-1 py-4 font-medium cursor-pointer transition-colors text-sm md:text-base ${
        active 
          ? "border-b-2 border-black text-black"
          : "text-gray-500 hover:text-gray-700"
      }`}
      onClick={onClick}
    >
      {children}
    </button>
  );