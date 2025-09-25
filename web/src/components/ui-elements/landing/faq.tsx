import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import React from 'react'

const FAQ = () => {
  return (
    <Accordion type="single" collapsible className="w-full">
      <AccordionItem value="item-1">
        <AccordionTrigger>What is Syndic?</AccordionTrigger>
        <AccordionContent>
          Syndic is an intelligent routing platform for global payments,
          designed to make transfers faster, more affordable, and fully
          transparent by optimizing every transaction.
        </AccordionContent>
      </AccordionItem>
      <AccordionItem value="item-2">
        <AccordionTrigger>What problem does Syndic solve?</AccordionTrigger>
        <AccordionContent>
          Syndic solves the critical problems of high costs, slow settlement,
          and lack of transparency that plague today's outdated cross-border
          payment systems. It eliminates the excessive fees and multi-day delays
          that harm migrant workers and small businesses the most.
        </AccordionContent>
      </AccordionItem>
      <AccordionItem value="item-3">
        <AccordionTrigger>Who is Syndic for?</AccordionTrigger>
        <AccordionContent>
          Syndic is ideal for anyone requiring efficient cross-border payments,
          from migrant workers sending remittances to businesses paying global
          suppliers.
        </AccordionContent>
      </AccordionItem>
      <AccordionItem value="item-4">
        <AccordionTrigger>Is my money safe with Syndic?</AccordionTrigger>
        <AccordionContent>
          Yes. We secure all funds and data with bank-grade encryption, audited
          smart contracts, and rigorous adherence to financial compliance
          standards
        </AccordionContent>
      </AccordionItem>
      <AccordionItem value="item-5">
        <AccordionTrigger>
          How is Syndic better than a bank or traditional service?
        </AccordionTrigger>
        <AccordionContent>
          By bypassing costly intermediaries and legacy systems, Syndic offers
          superior speed, radically lower fees, and 24/7 transaction processing.
        </AccordionContent>
      </AccordionItem>
    </Accordion>
  );
}

export default FAQ