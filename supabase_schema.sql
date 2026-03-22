-- ==========================================
-- Schéma Base de Données - Rencontre De Luxe
-- ==========================================

-- 1. Table des Profils (Utilisateurs normaux et profils Admin)
CREATE TABLE IF NOT EXISTS public.profiles (
  id text PRIMARY KEY,                   -- Identifiant unique (ex: email, tel, ou généré)
  name text NOT NULL,                    -- Prénom
  email text,                            -- Contact (email ou téléphone)
  age integer,                           -- Âge
  location text,                         -- Ville/Pays
  image text,                            -- URL de la photo de profil
  bio text,                              -- Description
  interests text[],                      -- Liste des centres d'intérêt
  is_admin boolean DEFAULT false,        -- True si c'est un profil créé par l'admin
  is_vip boolean DEFAULT false,          -- True si compte VIP premium
  online boolean DEFAULT true,           -- Statut en ligne
  match_percentage integer DEFAULT 75,   -- Pourcentage affiché arbitraire ou calculé
  status text DEFAULT 'actif',           -- 'actif', 'suspendu'
  created_at timestamp with time zone DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- 2. Table des Messages du Chat
CREATE TABLE IF NOT EXISTS public.messages (
  id uuid DEFAULT gen_random_uuid() PRIMARY KEY,
  from_profile_id text REFERENCES public.profiles(id) ON DELETE CASCADE,
  to_profile_id text REFERENCES public.profiles(id) ON DELETE CASCADE,
  text text NOT NULL,                    -- Contenu du message
  created_at timestamp with time zone DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- 3. Configuration des permissions d'accès (RLS)
-- Pour faciliter le développement du prototype sans authentification complexe immédiate, 
-- nous autorisons l'accès total (lecture/écriture) depuis l'application cliente.
ALTER TABLE public.profiles DISABLE ROW LEVEL SECURITY;
ALTER TABLE public.messages DISABLE ROW LEVEL SECURITY;

-- Ajout de la politique "Allow All" au cas où RLS est activé
CREATE POLICY "Activer tout pour les profils" ON public.profiles FOR ALL USING (true);
CREATE POLICY "Activer tout pour les messages" ON public.messages FOR ALL USING (true);
