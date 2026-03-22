const { Client } = require('pg');

const client = new Client({
  connectionString: 'postgresql://postgres:GhtY7Rp6nrnUkn_@db.vrfrdqqbvvbytczshwqg.supabase.co:5432/postgres'
});

async function run() {
  console.log("Tentative de connexion à Supabase...");
  try {
    await client.connect();
    console.log("Connecté avec succès ! Création des tables...");
    
    const sql = `
-- 1. Table des Profils (Utilisateurs normaux et profils Admin)
CREATE TABLE IF NOT EXISTS public.profiles (
  id text PRIMARY KEY,                   
  name text NOT NULL,                    
  email text,                            
  age integer,                           
  location text,                         
  image text,                            
  bio text,                              
  interests text[],                      
  is_admin boolean DEFAULT false,        
  is_vip boolean DEFAULT false,          
  online boolean DEFAULT true,           
  match_percentage integer DEFAULT 75,   
  status text DEFAULT 'actif',           
  created_at timestamp with time zone DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- 2. Table des Messages du Chat
CREATE TABLE IF NOT EXISTS public.messages (
  id uuid DEFAULT gen_random_uuid() PRIMARY KEY,
  from_profile_id text REFERENCES public.profiles(id) ON DELETE CASCADE,
  to_profile_id text REFERENCES public.profiles(id) ON DELETE CASCADE,
  text text NOT NULL,                    
  created_at timestamp with time zone DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- 3. Configuration des permissions d'accès (RLS)
ALTER TABLE public.profiles DISABLE ROW LEVEL SECURITY;
ALTER TABLE public.messages DISABLE ROW LEVEL SECURITY;
    `;
    
    await client.query(sql);
    console.log("✅ Tables créées avec succès !");
  } catch (err) {
    console.error("❌ Erreur pendant l'exécution:", err);
  } finally {
    await client.end();
  }
}

run();
