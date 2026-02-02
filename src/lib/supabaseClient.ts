import { createClient, type SupabaseClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

// Cette fonction permet de ne créer le client que si la configuration est valide.
function getSupabaseClient(): SupabaseClient | null {
    const url = supabaseUrl;
    const key = supabaseAnonKey;

    if (url && key && !key.includes('VOTRE_CLE')) {
        try {
            return createClient(url, key);
        } catch (error) {
            console.error("Erreur lors de la création du client Supabase:", error);
            return null;
        }
    }
    // Si la configuration est manquante ou incomplète, on retourne null.
    // Les pages et composants devront gérer ce cas.
    return null;
}

export const supabase = getSupabaseClient();
