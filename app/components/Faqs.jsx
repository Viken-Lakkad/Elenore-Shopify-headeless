import { useCallback, useState } from "react";

export const Faqs = () => {
  const [openSection, setOpenSection] = useState("shipping");
  const [openQuestion, setOpenQuestion] = useState(null);

  const sections = [
    {
      id: "shipping",
      title: "Shipping, Returns & Exchanges",
      questions: [
        {
          id: "shipping-policy",
          question: "What is the shipping policy?",
          answer:
            "We use all major carriers, and local courier partners. You'll be asked to select a delivery method during checkout. Standard shipping typically takes 5-7 business days, while express shipping takes 2-3 business days.",
        },
        {
          id: "returns",
          question: "What is the return policy?",
          answer:
            "We accept returns within 30 days of delivery. Items must be unused, in original packaging, and in the same condition you received them. Please contact our customer service team to initiate a return.",
        },
        {
          id: "exchanges",
          question: "How do I exchange an item?",
          answer:
            "Exchanges can be processed through your order history. Select the item you wish to exchange and follow the prompts. We'll ship the replacement once we receive your return.",
        },
      ],
    },
    {
      id: "orders",
      title: "Orders",
      questions: [
        {
          id: "access-orders",
          question: "Where can I access my past and present orders?",
          answer:
            'You can view all your orders by logging into your account and navigating to "My Orders" in your account dashboard. There you\'ll find order history, tracking information, and order details.',
        },
        {
          id: "track-order",
          question: "How can I track my order?",
          answer:
            "Once your order ships, you'll receive a tracking number via email. You can also track your order by visiting the Orders section in your account and clicking on the specific order.",
        },
        {
          id: "cancel-order",
          question: "Can I cancel my order?",
          answer:
            "Orders can be cancelled within 24 hours of placement if they haven't shipped yet. Please contact our customer service team immediately to cancel an order.",
        },
      ],
    },
    {
      id: "wishlist",
      title: "Wishlist",
      questions: [
        {
          id: "create-wishlist",
          question: "How do I create a wishlist?",
          answer:
            "Click the heart icon on any product page to add items to your wishlist. You can access your wishlist anytime by clicking the heart icon in the navigation menu.",
        },
        {
          id: "share-wishlist",
          question: "Can I share my wishlist?",
          answer:
            "Yes! Your wishlist has a unique shareable link that you can send to friends and family. Find the share button on your wishlist page.",
        },
      ],
    },
    {
      id: "address",
      title: "Address",
      questions: [
        {
          id: "manage-address",
          question: "How do I manage my shipping addresses?",
          answer:
            'Go to your account settings and select "Address Book" to add, edit, or remove shipping addresses. You can save multiple addresses and set a default address.',
        },
        {
          id: "change-address",
          question: "Can I change my delivery address after placing an order?",
          answer:
            "Address changes are possible only if the order hasn't shipped yet. Please contact customer service immediately to request an address change.",
        },
      ],
    },
    {
      id: "gift-cards",
      title: "Gift cards",
      questions: [
        {
          id: "purchase-gift-card",
          question: "How do I purchase a gift card?",
          answer:
            "Gift cards are available in various denominations on our Gift Cards page. You can choose to send them via email or receive a physical card.",
        },
        {
          id: "redeem-gift-card",
          question: "How do I redeem a gift card?",
          answer:
            "Enter your gift card code at checkout in the payment section. The gift card balance will be applied to your order total.",
        },
        {
          id: "check-balance",
          question: "How can I check my gift card balance?",
          answer:
            "You can check your gift card balance on the Gift Cards page by entering your card number, or view it in your account wallet.",
        },
      ],
    },
    {
      id: "wallet",
      title: "Wallet",
      questions: [
        {
          id: "wallet-info",
          question: "What is the wallet feature?",
          answer:
            "Your wallet stores gift cards, store credit, and promotional credits. Access it from your account dashboard to view available balances.",
        },
      ],
    },
    {
      id: "birthday",
      title: "Birthday & Anniversary",
      questions: [
        {
          id: "special-offers",
          question: "Do you offer birthday or anniversary discounts?",
          answer:
            "Yes! Add your birthday and anniversary dates in your account settings to receive special offers and discounts during your celebration months.",
        },
      ],
    },
    {
      id: "loyalty",
      title: "Loyalty Program",
      questions: [
        {
          id: "join-loyalty",
          question: "How do I join the loyalty program?",
          answer:
            "Simply create an account and you're automatically enrolled! Earn points with every purchase that can be redeemed for discounts and exclusive perks.",
        },
        {
          id: "earn-points",
          question: "How do I earn loyalty points?",
          answer:
            "Earn 1 point for every dollar spent. Bonus points are available for reviews, referrals, and social media engagement.",
        },
      ],
    },
    {
      id: "contact",
      title: "Contact Us",
      questions: [
        {
          id: "customer-service",
          question: "How can I contact customer service?",
          answer:
            "You can reach us via email at support@example.com, call us at 1-800-XXX-XXXX, or use the contact form on our Contact Us page. We're available Monday-Friday, 9am-6pm EST.",
        },
      ],
    },
  ];

  const toggleSection = useCallback((sectionId) => {
    setOpenSection((prev) => {
      if (prev === sectionId) {
        setOpenQuestion(null);
        return null;
      }
      // Opening a new section -> reset question and open section
      setOpenQuestion(null);
      return sectionId;
    });
  }, []);

  // Toggle question (accordion)
  const toggleQuestion = useCallback((questionId) => {
    setOpenQuestion((prev) => (prev === questionId ? null : questionId));
  }, []);
  return (
    <div>
      <div className="max-w-7xl mx-auto px-4 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          {/* Sidebar */}
          <div className="lg:col-span-3">
            <h2 className="font-medium mb-6">How can we help?</h2>
            <nav className="space-y-1" aria-label="FAQ categories">
              {sections.map((section) => (
                <button
                  key={section.id}
                  onClick={() => toggleSection(section.id)}
                  className={`w-full text-left px-0 py-2 text-sm transition-colors ${
                    openSection === section.id
                      ? "text-[#A04A66] font-medium"
                      : "text-black"
                  }`}
                  aria-expanded={openSection === section.id}
                >
                  {section.title}
                </button>
              ))}
            </nav>
          </div>

          {/* Main Content */}
          <div className="lg:col-span-9">
            <h2 className="font-streamline text-5xl mb-8">FAQs</h2>

            {openSection ? (
              <div>
                <h2 className="font-streamline text-2xl font-light mb-5">
                  {sections.find((s) => s.id === openSection)?.title}
                </h2>

                {openSection === "shipping" && (
                  <p className="text-gray-700 mb-8">
                    We use all major carriers, and local courier partners.
                    You'll be asked to select a delivery method during checkout.
                  </p>
                )}

                <div className="space-y-4">
                  {sections
                    .find((s) => s.id === openSection)
                    ?.questions.map((q) => (
                      <div key={q.id} className="border-b border-gray-200">
                        <button
                          onClick={() => toggleQuestion(q.id)}
                          className="w-full flex items-center justify-between py-4 text-left transition-colors"
                          aria-expanded={openQuestion === q.id}
                        >
                          <span className="text-base font-normal pr-8">
                            {q.question}
                          </span>
                        </button>

                        {openQuestion === q.id && (
                          <div className="pb-4 text-gray-600 text-sm leading-relaxed">
                            {q.answer}
                          </div>
                        )}
                      </div>
                    ))}
                </div>
              </div>
            ) : (
              <div className="text-gray-500 text-center py-12">
                <p className="text-lg">
                  Select a category from the menu to view frequently asked
                  questions.
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
