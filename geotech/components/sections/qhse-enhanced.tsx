"use client";

import { motion } from "framer-motion";
import { useLanguage } from "@/geotech/components/providers/language-provider";
import { SectionHeading } from "@/geotech/components/section-heading";
import { Check } from "lucide-react";

export function QhseEnhanced() {
  const { dict } = useLanguage();

  // Health & Safety data
  const healthSafetyCommitments = [
    "A safe working environment.",
    "Safe systems of work.",
    "Facilities for the welfare of workers.",
    "Information, instruction, training and supervision.",
    "Ensure that each worker is safe from injury and risks to health.",
    "A commitment to continually improve our performance through effective safety management.",
  ];

  const workerObligations = [
    "Comply with safe work practices.",
    "Take reasonable care of the health and safety of themselves and others.",
    "Wear personal protective equipment and clothing where necessary.",
    "Comply with management health and safety directions.",
    "Not misuse or interfere with safety provisions.",
    "Report all accidents and incidents immediately.",
  ];

  // Quality data
  const qualityObjectives = [
    "Exceptional service and reliability.",
    "Quality workmanship by committed and trained personnel.",
    "Value for money using suitable quality materials.",
    "Satisfy clients' requirements, industry regulators and staff.",
    "Professional and ethically responsible delivery.",
  ];

  const employeeResponsibilities = [
    "Understand the client's requirements.",
    "Be responsible and accountable for quality of service and quality of work.",
    "Adopt and operate a collaborative approach with the client, supply chain partners and stakeholders.",
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.05,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 },
  };

  return (
    <div className="space-y-20">
      {/* Health & Safety Policy */}
      <section className="border-t border-border pt-20">
        <div className="mb-12">
          <h2 className="text-3xl sm:text-4xl font-bold mb-4">
            Health and Safety Policy Statement
          </h2>
          <p className="text-lg leading-relaxed text-muted-foreground max-w-3xl">
            GEODRILL is committed to working in a way that protects the health,
            safety and welfare of its employees and others affected by its
            activities. Health and safety will never be compromised for other
            objectives.
          </p>
        </div>

        {/* Management Commitments */}
        <div className="mb-12">
          <h3 className="text-2xl font-bold mb-8">Management Commitments</h3>
          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-50px" }}
            className="space-y-4"
          >
            {healthSafetyCommitments.map((commitment, i) => (
              <motion.div
                key={i}
                variants={itemVariants}
                className="flex gap-4 p-4 rounded-lg border border-border/40 bg-surface/50"
              >
                <div className="flex-shrink-0 mt-1">
                  <span className="inline-flex h-8 w-8 items-center justify-center rounded-full border-2 border-primary/30 text-xs font-bold text-primary">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                </div>
                <p className="text-base leading-relaxed text-foreground">
                  {commitment}
                </p>
              </motion.div>
            ))}
          </motion.div>
        </div>

        {/* Worker Obligations */}
        <div>
          <h3 className="text-2xl font-bold mb-8">Worker Obligations</h3>
          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-50px" }}
            className="space-y-4"
          >
            {workerObligations.map((obligation, i) => (
              <motion.div
                key={i}
                variants={itemVariants}
                className="flex gap-4 p-4 rounded-lg border border-border/40 bg-surface/50 group hover:bg-surface/80 transition-colors"
              >
                <div className="flex-shrink-0 mt-1">
                  <Check className="w-6 h-6 text-primary/60 group-hover:text-primary transition-colors" />
                </div>
                <p className="text-base leading-relaxed text-foreground">
                  {obligation}
                </p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Quality Policy */}
      <section className="border-t border-border pt-20">
        <div className="mb-12">
          <h2 className="text-3xl sm:text-4xl font-bold mb-4">
            Quality Policy Statement
          </h2>
          <p className="text-lg leading-relaxed text-muted-foreground max-w-3xl">
            GEODRILL is committed to providing quality work that meets project
            standards and specifications for materials, workmanship, tolerances,
            schedules and public service. Continual improvement is ensured
            through quality processes directed by a strong management team.
          </p>
        </div>

        {/* Quality Objectives */}
        <div className="mb-12">
          <h3 className="text-2xl font-bold mb-8">Quality Objectives</h3>
          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-50px" }}
            className="grid gap-4 sm:grid-cols-2 md:grid-cols-3"
          >
            {qualityObjectives.map((objective, i) => (
              <motion.div
                key={i}
                variants={itemVariants}
                className="p-6 rounded-lg border border-border/40 bg-surface/50 hover:border-primary/30 hover:bg-surface/80 transition-all"
              >
                <p className="text-base font-medium leading-relaxed text-foreground">
                  {objective}
                </p>
              </motion.div>
            ))}
          </motion.div>
        </div>

        {/* Employee Responsibilities */}
        <div className="mb-12">
          <h3 className="text-2xl font-bold mb-8">
            Employee Quality Responsibilities
          </h3>
          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-50px" }}
            className="space-y-4"
          >
            {employeeResponsibilities.map((responsibility, i) => (
              <motion.div
                key={i}
                variants={itemVariants}
                className="flex gap-4 p-4 rounded-lg border border-border/40 bg-surface/50"
              >
                <div className="flex-shrink-0 mt-1">
                  <span className="inline-flex h-8 w-8 items-center justify-center rounded-full border-2 border-primary/30 text-xs font-bold text-primary">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                </div>
                <p className="text-base leading-relaxed text-foreground">
                  {responsibility}
                </p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ISO Certification */}
      <section className="border-t border-border pt-20 pb-12">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-50px" }}
          transition={{ duration: 0.6 }}
          className="rounded-lg border border-border/40 bg-surface/50 p-8 sm:p-12 text-center"
        >
          <h3 className="text-2xl sm:text-3xl font-bold mb-4">
            Quality Management Certification
          </h3>
          <div className="text-5xl sm:text-6xl font-bold text-primary mb-4">
            BS EN ISO 9001:2015
          </div>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            GEODRILL maintains certification under the international standard
            for quality management systems, demonstrating our commitment to
            consistent quality and continual improvement.
          </p>
        </motion.div>
      </section>
    </div>
  );
}
