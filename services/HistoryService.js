import { supabase } from "../lib/supabase";

export const getHistory = async (user_id) => {
  try {
    const {data, error} = await supabase.from('history').select(`*, details (flower_name)`).eq('user_id', user_id)
    .order('created_at', {ascending: false});
    if (error) {
      return {success: false};
    }
    return {success: true, data};
  } catch (error) {
    return {success: false};
  }
}

export const createHistory = async (historyData) => {
  console.log('historyData', historyData);
  try {
    const {data, error} = await supabase.from('history').upsert(historyData).select().single();
    if (error) {
      return {success: false};
    }
    return {success: true, data};
  } catch (error) {
    return {success: false};
  }
}

export const deleteHistory = async (history_id, user_id) => {
  try {
    const { error } = await supabase
      .from('history')
      .delete()
      .eq('id', history_id)
      .eq('user_id', user_id);
    if (error) {
      return {success: false};
    }
    return {success: true};
  } catch (error) {
    return {success: false};
  }
}

