import React from "react"
import { motion } from "framer-motion"
import { FaHistory, FaLeaf, FaUsers } from "react-icons/fa"

const AboutPage = () => {
  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.5 }}>
      <h2 className="text-3xl font-bold mb-6">About KSP Yarns</h2>

      <motion.section
        className="mb-8"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.2 }}
      >
        <h3 className="text-2xl font-semibold mb-4 flex items-center">
          <FaHistory className="mr-2" /> Our History
        </h3>
        <p className="text-lg">
          Founded in 1992, KSP Yarns has been at the forefront of the textile industry for over three decades. What
          started as a small family-owned business has grown into a leading manufacturer of high-quality yarns, serving
          customers worldwide.
        </p>
      </motion.section>

      <motion.section
        className="mb-8"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.4 }}
      >
        <h3 className="text-2xl font-semibold mb-4 flex items-center">
          <FaLeaf className="mr-2" /> Our Commitment to Sustainability
        </h3>
        <p className="text-lg">
          At KSP Yarns, we believe in responsible manufacturing. We're committed to reducing our environmental impact
          through sustainable practices, including the use of recycled materials, energy-efficient production methods,
          and waste reduction initiatives.
        </p>
      </motion.section>

      <motion.section
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.6 }}
      >
        <h3 className="text-2xl font-semibold mb-4 flex items-center">
          <FaUsers className="mr-2" /> Our Team
        </h3>
        <p className="text-lg">
          Our success is built on the expertise and dedication of our team. From our skilled technicians to our
          innovative designers, every member of KSP Yarns is committed to delivering excellence in every thread we
          produce.
        </p>
      </motion.section>
    </motion.div>
  )
}

export default AboutPage

