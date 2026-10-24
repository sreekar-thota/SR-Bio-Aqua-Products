export const KNOWLEDGE_ARTICLES = [
  {
    id: 'pond-water-quality',
    title: 'Pond Water Quality Management for High-Density Shrimp Farming',
    category: 'Water Chemistry',
    readTime: '4 min read',
    summary: 'Essential chemical parameters (pH, alkalinity, hardness, and nitrogenous metabolites) and proactive management techniques to prevent toxic spikes in aquaculture ponds.',
    content: [
      {
        heading: 'The Foundation of Aquatic Health',
        body: 'In intensive shrimp (Penaeus vannamei) and fish culture, water is not just the living medium—it is the biological life support system. Changes in ambient temperature, plankton blooms, and feeding frequency constantly shift physical and chemical variables.'
      },
      {
        heading: 'Key Parameters to Monitor Daily',
        body: 'Pond managers must track: pH (ideal 7.5 – 8.3 with diurnal fluctuation under 0.5), Alkalinity (minimum 120 – 160 ppm for healthy molting), and Ammonia (TAN < 0.1 mg/L un-ionized). High ammonia at elevated pH induces severe gill irritation and lethargy.'
      },
      {
        heading: 'Managing Toxic Ammonia & Nitrite Spikes',
        body: 'When organic matter decomposes rapidly, ammonia spikes can occur. Cation-exchange mineral conditioners like natural Zeolite adsorb excess ammonium ions at the bottom, while multi-species nitrifying bio-cultures oxidize toxic nitrite into safe nitrate.'
      }
    ],
    practicalTakeaways: [
      'Record morning (6:00 AM) and afternoon (3:00 PM) pH readings daily to calculate fluctuations.',
      'Maintain total alkalinity above 120 mg/L before expected shrimp molting phases.',
      'Distinguish educational guidance from specific dosage: Always calculate pond water volume (area x depth) before introducing mineral conditioners.'
    ]
  },
  {
    id: 'dissolved-oxygen-monitoring',
    title: 'Critical Dissolved Oxygen (DO) Dynamics & Emergency Interventions',
    category: 'Oxygen Dynamics',
    readTime: '5 min read',
    summary: 'How nocturnal photosynthetic drops impact pond bottom oxygen levels, how to identify early signs of hypoxic distress, and emergency aeration techniques.',
    content: [
      {
        heading: 'Understanding Nocturnal Oxygen Plunges',
        body: 'During daylight hours, microscopic algae produce abundant oxygen via photosynthesis. However, after sundown, both the cultured species and phytoplankton consume oxygen through continuous respiration. In dense ponds, DO levels can precipitously drop from 6.0 ppm to below 2.5 ppm in the early hours between 3:00 AM and 6:00 AM.'
      },
      {
        heading: 'Recognizing Early Hypoxia Distress Signals',
        body: 'Shrimp suffering from low dissolved oxygen exhibit subtle early symptoms: gathering near pond dykes, swimming sluggishly near the water surface, reduced feeding tray consumption, or sudden red coloration on appendages. Fish will actively gasp at the surface.'
      },
      {
        heading: 'Mechanical vs Chemical Emergency Support',
        body: 'While mechanical paddlewheels create surface currents, bottom sediment often remains anoxic. During critical nocturnal drops, cloudy weather spells, or sudden power disruptions, rapid-releasing oxygen tablets or granules provide crucial dissolved oxygen straight to the benthic zone where shrimp reside.'
      }
    ],
    practicalTakeaways: [
      'Maintain DO above 4.0 ppm at all times; levels below 3.0 ppm trigger chronic stress and appetite loss.',
      'Check aeration mechanical belts and diesel backups before every sunset.',
      'Keep fast-acting oxygen tablets on site ready for emergency deployment during unpredicted overcast days.'
    ]
  },
  {
    id: 'shrimp-mineral-nutrition',
    title: 'Shrimp Mineral Nutrition: The Science of Successful Moulting Cycles',
    category: 'Nutrition & Physiology',
    readTime: '4 min read',
    summary: 'Why marine decapod crustaceans require balanced bio-available calcium, magnesium, and trace minerals for continuous exoskeleton hardening and disease resistance.',
    content: [
      {
        heading: 'The Crustacean Molting Physiology',
        body: 'Shrimp grow by shedding their rigid chitinous exoskeleton (ecdysis) periodically. Immediately after shedding, the new soft cuticle absorbs minerals directly from surrounding water and feed within 2 to 4 hours to harden properly.'
      },
      {
        heading: 'Calcium to Magnesium Ratios',
        body: 'In low-salinity bore-well or inland culture waters, ionic ratios are frequently skewed. A healthy water profile targets a Ca:Mg ratio of approximately 1:3, alongside adequate potassium and trace micronutrients like zinc, manganese, and bio-available phosphorus.'
      },
      {
        heading: 'Consequences of Mineral Deficiencies',
        body: 'Deficient ponds often witness soft-shell syndrome, incomplete moulting mortality, muscle cramps, and increased cannibalism by healthy cohorts on vulnerable soft shrimp.'
      }
    ],
    practicalTakeaways: [
      'Supplement balanced chelated minerals 24-48 hours prior to anticipated lunar moulting peaks (New Moon and Full Moon).',
      'Test ionic mineral concentrations (Calcium, Magnesium, Potassium) every 15 days in low-saline systems.',
      'Consult with qualified technical representatives to formulate water-specific ionic mineral budgets.'
    ]
  },
  {
    id: 'pond-probiotics',
    title: 'Harnessing Probiotics for Sludge Digestion & Pathogen Exclusion',
    category: 'Biotechnology',
    readTime: '5 min read',
    summary: 'The competitive exclusion principle: how diverse beneficial bacterial consortia degrade bottom waste, control Vibrio pathogens, and stabilize water bio-security.',
    content: [
      {
        heading: 'The Biology of Competitive Exclusion',
        body: 'Aquatic environments are teeming with microbes. By inoculating ponds with robust multi-strain beneficial bacteria (Bacillus subtilis, Bacillus megaterium, Paracoccus, Nitrosomonas), farmers establish competitive dominance, depriving opportunistic pathogenic Vibrio bacteria of space and nutrients.'
      },
      {
        heading: 'Sludge Digestion at the Pond Bottom',
        body: 'Excess feed pellets, fecal matter, and dead algae accumulate as thick black benthic sludge. Specialized heterotrophic bacteria produce extracellular enzymes (proteases, amylases, cellulases) that break down organic sludge into non-toxic soluble compounds.'
      },
      {
        heading: 'Optimal Bio-Fermentation Application',
        body: 'To activate dormant bacterial endospores before application, field aeration in clean pond water enriched with energy sources (such as jaggery and rice bran) wakes up the bacterial population for maximum biological potency upon pond broadcast.'
      }
    ],
    practicalTakeaways: [
      'Apply probiotics in the morning with aerators running to facilitate uniform bacterial distribution.',
      'Maintain regular weekly probiotic dosing rather than irregular large doses to preserve bacterial dominance.',
      'Avoid simultaneous application of harsh chemical disinfectants with live probiotic inoculations.'
    ]
  },
  {
    id: 'responsible-aquaculture-practices',
    title: 'Responsible Aquaculture Practices & Biosecurity Protocols',
    category: 'Farm Management',
    readTime: '4 min read',
    summary: 'Best management practices compliant with Coastal Aquaculture Authority (CAA) standards, feed management, and eco-friendly disease prevention.',
    content: [
      {
        heading: 'Biosecurity from Pond Preparation to Harvest',
        body: 'Sustainable aquaculture rests upon disciplined biosecurity: proper pond drying, bottom tilling, bird scare line installation, crab fencing, and water pre-filtration through mesh screens to prevent wild vectors from contaminating the culture.'
      },
      {
        heading: 'Scientific Feed Tray Management',
        body: 'Overfeeding is the number one cause of water deterioration. Utilizing monitoring check-trays allows precise feed rationing according to water temperature, oxygen status, and molting cycles, dramatically lowering FCR.'
      },
      {
        heading: 'Compliance with CAA and Environmental Standards',
        body: 'Adhering to CAA registration and utilizing approved, non-antibiotic bio-supplements ensures seafood safety for consumers, protects groundwater tables, and guarantees long-term farm profitability.'
      }
    ],
    practicalTakeaways: [
      'Adjust feed downward by 30-50% during cloudy days, heavy rainfall, or when DO is below optimal levels.',
      'Maintain separate nets and equipment for each individual pond to eliminate cross-contamination.',
      'Rely on proven biotechnology and preventive water stewardship rather than reactive chemical interventions.'
    ]
  }
];
