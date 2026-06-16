---
title: "Streamflow Prediction in Snow-Dominated Basins: A Research Update"
date: 2025-05-15
lastmod: 2025-05-15
author: "Srinjoy Bhuiya"
description: "An overview of my current thesis research on long-term river streamflow forecasting using pretrained attention-fusion models."
tags:
  - "research"
  - "machine-learning"
  - "hydrology"
  - "deep-learning"
  - "time-series"
categories:
  - "research-updates"
draft: false
---

My thesis work at the University of Alberta focuses on a challenging problem at the intersection of deep learning and hydrology: **predicting river streamflow in snow-dominated basins** where historical data is scarce.

## The Problem

River flow prediction is critical for:
- **Water resource management** — municipal supply, agriculture
- **Flood early warning** — safety and infrastructure planning
- **Climate impact assessment** — understanding changing snowmelt patterns

Traditional hydrological models rely on well-calibrated physical parameters that require years of measurements. In remote or recently instrumented basins, these measurements simply don't exist.

## Our Approach

We are developing a **pretrained attention-fusion architecture** that:

1. **Pretrained on many basins** — learns general streamflow dynamics from data-rich regions
2. **Fuses multiple inputs** — combines meteorological data (temperature, precipitation, snow water equivalent) with topographic features
3. **Fine-tuned on target basin** — uses multi-stage specialised fine-tuning for the Bow River near Calgary

The attention mechanism allows the model to selectively weight different input modalities and time steps, capturing the complex seasonality of snow accumulation and melt.

## Preliminary Results

Early experiments show that pretraining on a diverse set of basins — even those in different climate zones — provides a useful initialisation for low-data target basins. The model outperforms standard LSTM baselines on short calibration windows.

## Challenges

Working in this domain has surfaced interesting research challenges:

- **Data heterogeneity** — different measurement frequencies, units, and quality across basins
- **Non-stationarity** — climate change is shifting snow dynamics in ways historical models don't capture
- **Interpretability** — stakeholders (water managers, policy-makers) need explanations, not just predictions

## What's Next

The next phase involves:
- Scaling pretraining to larger multi-basin datasets
- Ablation studies on the fusion architecture components
- Benchmarking against operational forecasting models

I will share more updates as the research progresses. If you are working on related problems — hydrology ML, climate AI, or time-series forecasting — I would love to connect!

---

*This work is supervised by [Dr. Nilanjan Ray](https://webdocs.cs.ualberta.ca/~nray1/) at the [VISUAL Laboratory](https://ualbertavisual.ca/), University of Alberta.*
