import { useState } from 'react'
import DailyMetric from '../../../models/DailyMetric.models'
import AddMetricForm from '../AddMetricForm/AddMetricForm'
import MetricsForm from '../MetricsForm/MetricsForm'

export default function parentForm () {

    return (
      <>
        <MetricsForm formId="form-id" metricFormId="add-metrics-form" data={DailyMetric} />
        <AddMetricForm addMetricFormId="new-metric-form" />
      </>
    )
}
