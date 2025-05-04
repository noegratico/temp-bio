import supabase from "../supabase/supabase"
import { Database } from "../supabase/types"

export type User = Database['public']['Tables']['users']['Row']


export async function createUser(data: Partial<User>) {
    const { data: user, error } = await supabase.from('users').insert({
        ...data,    
    })

    if (error) throw error

    return user
}

export async function getUser(id: string) {
    const { data, error } = await supabase.from('users').select('*').eq('id', id)
    if (error) throw error
    return data
}
