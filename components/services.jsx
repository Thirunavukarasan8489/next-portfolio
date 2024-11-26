import UIUX from "../public/icons/UIUX.svg";
import WebDesign from "../public/icons/Web Design.svg";
import DigitalMarketing from "../public/icons/Digital-Marketing.svg";
import FullStack from "../public/icons/Full-Stack Development.svg";
import GraphicDesigner from "../public/icons/graphic-design.svg";
import Printing from "../public/icons/Printing.svg";
import Image from "next/image";
export default function Services() {
  return (
    <section id="services" className="py-20">
      <div>
        <h2 className="font-bold text-center text-h3 pb-6">WHAT DO I OFFER</h2>
        <div className="flex justify-center pb-10">
          <div className="border-b-2 border-primary relative w-6"></div>
          <div className="relative top-1.5 border-2 border-primary h-4 w-4 borderRadius"></div>
          <div className="relative top-1.5 border-2 border-primary h-4 w-4 borderRadius1"></div>
          <div className="border-b-2 border-primary relative w-6"></div>
        </div>
        <p className="font-semibold roboto-regular text-textcolor text-center px-8">
          Expert Web Development, UI/UX Design, and Tailored Digital Solutions
        </p>
        <div className="py-10 container mx-auto">
          <div className="grid xl:grid-cols-3 lg:grid-cols-3 md:grid-cols-2 mdsm:grid-cols-1 sm:grid-cols-1 gap-5 mx-10">
            <div className="border group border-bordercolor rounded-md hover:border-0 hover:border-b-4 shadow-md transition duration-300 hover:border-primary">
              <div className="text-center p-10">
                <div className="flex justify-center pb-6">
                  <Image src={UIUX} alt="UIUX" className="text-center" />
                </div>
                <p className="text-h6 group-hover:text-primary font-medium text-textblack pb-6">
                  UI / UX Design
                </p>
                <p className="roboto-regular text-textcolor leading-loose">
                  Expert UI/UX design services crafting user-friendly,
                  responsive interfaces for seamless digital experiences.
                </p>
              </div>
            </div>
            <div className="border group border-bordercolor rounded-md hover:border-0 hover:border-b-4 shadow-md transition duration-300 hover:border-primary">
              <div className="text-center p-10">
                <div className="flex justify-center pb-6">
                  <Image
                    src={WebDesign}
                    alt="Web Design"
                    className="text-center"
                  />
                </div>
                <p className="text-h6 group-hover:text-primary font-medium text-textblack pb-6">
                  web Design
                </p>
                <p className="roboto-regular text-textcolor leading-loose">
                  Professional web design services creating visually stunning,
                  responsive websites for optimal user experience.
                </p>
              </div>
            </div>
            <div className="border group border-bordercolor rounded-md hover:border-0 hover:border-b-4 shadow-md transition duration-300 hover:border-primary">
              <div className="text-center p-10">
                <div className="flex justify-center pb-6">
                  <Image src={FullStack} alt="Full-Stack Development" />
                </div>
                <p className="text-h6 group-hover:text-primary font-medium text-textblack pb-6">
                  Full-Stack Development
                </p>
                <p className="roboto-regular text-textcolor leading-loose">
                  Comprehensive full-stack development services building
                  dynamic, scalable web applications from front to back.
                </p>
              </div>
            </div>
            <div className="border group border-bordercolor rounded-md hover:border-0 hover:border-b-4 shadow-md transition duration-300 hover:border-primary">
              <div className="text-center p-10">
                <div className="flex justify-center pb-6">
                  <Image
                    src={DigitalMarketing}
                    alt="Digital Marketing"
                    className="text-center"
                  />
                </div>
                <p className="text-h6 group-hover:text-primary font-medium text-textblack pb-6">
                  Digital Marketing
                </p>
                <p className="roboto-regular text-textcolor leading-loose">
                  Targeted digital marketing strategies designed to boost online
                  visibility, drive traffic, and increase conversions.
                </p>
              </div>
            </div>
            <div className="border group border-bordercolor rounded-md hover:border-0 hover:border-b-4 shadow-md transition duration-300 hover:border-primary">
              <div className="text-center p-10">
                <div className="flex justify-center pb-6">
                  <Image src={GraphicDesigner} alt="Graphic Design" />
                </div>
                <p className="text-h6 group-hover:text-primary font-medium text-textblack pb-6">
                  Graphic Design
                </p>
                <p className="roboto-regular text-textcolor leading-loose">
                  Creative graphic design solutions delivering visually
                  compelling branding, logos, and marketing materials.
                </p>
              </div>
            </div>
            <div className="border group border-bordercolor rounded-md hover:border-0 hover:border-b-4 shadow-md transition duration-300 hover:border-primary">
              <div className="text-center p-10">
                <div className="flex justify-center pb-6">
                  <Image src={Printing} alt="Graphic Design" />
                </div>
                <p className="text-h6 group-hover:text-primary font-medium text-textblack pb-6">
                  Expert Offset Printing
                </p>
                <p className="roboto-regular text-textcolor leading-loose">
                  Tailored printing solutions for tags, labels, and all types of
                  offset printing. Delivering sharp designs and vibrant colors
                  to make your brand stand out.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
