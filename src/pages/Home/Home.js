import React, { useState, useEffect } from "react";
import { Carousel } from "primereact/carousel";
import "primereact/resources/themes/saga-blue/theme.css"; // PrimeReact theme
import "primereact/resources/primereact.min.css"; // PrimeReact CSS
import "primeicons/primeicons.css";
import { Accordion, AccordionTab } from "primereact/accordion";
import { Image } from "primereact/image";

import { Card } from "primereact/card";

const products = [
  { id: 1, image: "/images/announcement-1.png" },
  { id: 2, image: "/images/announcement-2.png" },
  { id: 3, image: "/images/announcement-1.png" },
  { id: 4, image: "/images/announcement-2.png" },
  { id: 5, image: "/images/announcement-1.png" },
  { id: 6, image: "/images/announcement-2.png" },
];

const responsiveOptions = [
  {
    breakpoint: "1400px",
    numVisible: 2,
    numScroll: 1,
  },
  {
    breakpoint: "1199px",
    numVisible: 3,
    numScroll: 1,
  },
  {
    breakpoint: "767px",
    numVisible: 2,
    numScroll: 1,
  },
  {
    breakpoint: "575px",
    numVisible: 1,
    numScroll: 1,
  },
];

const productTemplate = (product) => {
  return (
    <div className="border-1 surface-border border-round m-2 text-center py-5 px-3">
      <div className="mb-3">
        <img
          src={product.image}
          alt={product.name}
          className="w-full h-auto"
          style={{ maxHeight: "300px" }}
        />
      </div>
    </div>
  );
};

const Home = () => {
  return (
    <div className="container mx-auto py-32">
      <Carousel
        value={products}
        numVisible={3}
        numScroll={3}
        responsiveOptions={responsiveOptions}
        className="custom-carousel"
        circular
        autoplayInterval={3000}
        itemTemplate={productTemplate}
      />
      <div className="py-32">
        <p className="text-5xl">Product & Services</p>
        <Accordion activeIndex={0}>
          <AccordionTab className="font-bold text-2xl" header="Insurance">
            <p className="m-0 font-normal font-medium">
            The National Confederation of Cooperatives Mutual Benefits Association (NATCCO MBA) Inc. was established to extend financial assistance through quality and affordable microinsurance products for its members.
            NATCCO MBAI partners with cooperatives, associations, and organized groups to ensure their members have access to insurance products that can help them in times of unexpected death or sickness.
            </p>
          </AccordionTab>
          <AccordionTab className="font-bold text-2xl" header="Credit">
            <p className="m-0 font-normal font-medium">
              Sed ut perspiciatis unde omnis iste natus error sit voluptatem
              accusantium doloremque laudantium, totam rem aperiam, eaque ipsa
              quae ab illo inventore veritatis et quasi architecto beatae vitae
              dicta sunt explicabo. Nemo enim ipsam voluptatem quia voluptas sit
              aspernatur aut odit aut fugit, sed quia consequuntur magni dolores
              eos qui ratione voluptatem sequi nesciunt. Consectetur, adipisci
              velit, sed quia non numquam eius modi.
            </p>
          </AccordionTab>
          <AccordionTab className="font-bold text-2xl" header="Savings">
            <p className="m-0 font-normal font-medium">
              At vero eos et accusamus et iusto odio dignissimos ducimus qui
              blanditiis praesentium voluptatum deleniti atque corrupti quos
              dolores et quas molestias excepturi sint occaecati cupiditate non
              provident, similique sunt in culpa qui officia deserunt mollitia
              animi, id est laborum et dolorum fuga. Et harum quidem rerum
              facilis est et expedita distinctio. Nam libero tempore, cum soluta
              nobis est eligendi optio cumque nihil impedit quo minus.
            </p>
          </AccordionTab>
          <AccordionTab className="font-bold text-2xl" header="Share Capital">
            <p className="m-0 font-normal font-medium">
              At vero eos et accusamus et iusto odio dignissimos ducimus qui
              blanditiis praesentium voluptatum deleniti atque corrupti quos
              dolores et quas molestias excepturi sint occaecati cupiditate non
              provident, similique sunt in culpa qui officia deserunt mollitia
              animi, id est laborum et dolorum fuga. Et harum quidem rerum
              facilis est et expedita distinctio. Nam libero tempore, cum soluta
              nobis est eligendi optio cumque nihil impedit quo minus.
            </p>
          </AccordionTab>
        </Accordion>
      </div>
      <div className="bg-auto md:bg-contain p-6">
        <Card title="About Us" className="text-black">
        <Image src="/images/nec-2.png" alt="Image" />
          <p className="m-0 font-normal text-black text-2xl py-16">
            NEC Multi-Purpose Cooperative is a duly registered Cooperative with
            the Cooperative Development Authority (CDA), the regulatory agency
            of the Government of the Republic of the Philippines over matters
            concerning the development of cooperatives in the country. NEC
            Multi-Purpose Cooperative is one of the Cooperatives in the country
            having more than 600M in Assets. We have been operating since 1993,
            started as closed type Coop from NATCCO for its employees, and
            became community type last 2006.
          </p>
        </Card>
      </div>
      <div></div>
    </div>
  );
};

export default Home;
