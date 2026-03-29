import { Form } from "react-router";

export const Contactform = ({ title, description }) => {
  return (
    <>
      <h2 className="text-center font-streamline text-5xl pt-4 pb-2">
        {title}
      </h2>
      {description && (
        <p className="text-center text-[#898B8E]">{description}</p>
      )}

      <section>
        <div className="pt-4 pb-9">
          <Form className="max-w-8/12 m-auto ">
            <div className="flex gap-2">
              <div className="w-6/12 flex flex-col">
                <label htmlFor="First_Name" className="text-[#898B8E]">
                  First Name
                </label>
                <input
                  type="text"
                  name="First_Name"
                  id="First_Name"
                  className="border border-[#898B8E] py-1 px-1 rounded-md  focus:ring-2 focus:ring-[#F1D3CD] focus:border-[#F1D3CD]"
                />
              </div>
              <div className="w-6/12 flex flex-col">
                <label htmlFor="Last_Name" className="text-[#898B8E]">
                  Last Name
                </label>
                <input
                  type="text"
                  name="Last_Name"
                  id="Last_Name"
                  className="border border-[#898B8E] py-1 px-1 rounded-md  focus:ring-2 focus:ring-[#F1D3CD] focus:border-[#F1D3CD]"
                />
              </div>
            </div>
            <div className="flex gap-2 py-5">
              <div className="w-6/12 flex flex-col">
                <label htmlFor="email" className="text-[#898B8E]">
                  E mail
                </label>
                <input
                  type="email"
                  name="email"
                  id="email"
                  className="border border-[#898B8E] py-1 px-1 rounded-md  focus:ring-2 focus:ring-[#F1D3CD] focus:border-[#F1D3CD]"
                />
              </div>
              <div className="w-6/12 flex flex-col">
                <label htmlFor="Company_Name" className="text-[#898B8E]">
                  Company Name
                </label>
                <input
                  type="text"
                  name="Company_Name"
                  id="Company_Name"
                  className="border border-[#898B8E] py-1 px-1 rounded-md  focus:ring-2 focus:ring-[#F1D3CD] focus:border-[#F1D3CD]"
                />
              </div>
            </div>
            <div className="w-full flex flex-col">
              <label htmlFor="Message" className="text-[#898B8E]">
                Message
              </label>
              <textarea
                name="Message"
                id="Message"
                rows="4"
                cols="50"
                className="border border-[#898B8E] py-1 px-1 rounded-md  focus:ring-2 focus:ring-[#F1D3CD] focus:border-[#F1D3CD]"
              ></textarea>
            </div>

            <div className="flex justify-center">
              <button
                type="submit"
                className="bg-primary px-4 py-2 uppercase mt-4 text-center  text-white"
              >
                Send
              </button>
            </div>
          </Form>
          <div className="-mt-40">
            <img src="/FormBG2.png" alt="FormBG.png" />
          </div>
        </div>
      </section>
    </>
  );
};
