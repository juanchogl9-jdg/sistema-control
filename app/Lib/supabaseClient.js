import { createClient } from '@supabase/supabase-js'

const supabaseUrl = 'https://fislanjcgihiubveqofh.supabase.co/rest/v1/'
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImZpc2xhbmpjZ2loaXVidmVxb2ZoIiwicm9sZSI6ImFub24iLCJpYXQiOjE3OTE5NzI3OTMsImV4cCI6MjEwNzU0ODc5M30.6polqL9u6Uiur9FDOtqasKcaFR2KQqW2RtSXsYtqCcw'

export const supabase = createClient(supabaseUrl, supabaseKey)