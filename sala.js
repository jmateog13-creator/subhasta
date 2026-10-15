/* Sala en directe, anònima.
 * Supabase Realtime (wss :443, passa el firewall de l'institut). Només broadcast i
 * presència: no es desa res a cap base de dades i ningú no inicia sessió.
 * Cada dispositiu té un id aleatori (sessionStorage). La pissarra és l'única font de veritat. */
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2.110.1';

const sb = createClient('https://dxpdciplsxjmtfhnbqao.supabase.co', 'sb_publishable_nOg_fx9ai3hbMOD4-ZI-Sg_V9i9VZhW', {
  auth: { persistSession: false, autoRefreshToken: false, storageKey: 'tutoria-sala' },
  realtime: { params: { eventsPerSecond: 20 } },
});

export function elMeuId() {
  try {
    let id = sessionStorage.getItem('tutoria-sala-id');
    if (!id) { id = crypto.randomUUID(); sessionStorage.setItem('tutoria-sala-id', id); }
    return id;
  } catch { return crypto.randomUUID(); }
}

/* connecta({ codi, uid, prefix, onMissatge(payload), onPresencia(uids[]), onEstat('ok'|'error') })
 * → { envia(type, dades), surt() } */
export function connecta({ codi, uid, prefix, onMissatge, onPresencia, onEstat }) {
  const canal = sb.channel(prefix + codi, { config: { broadcast: { self: false }, presence: { key: uid } } });
  canal.on('broadcast', { event: 'm' }, ({ payload }) => payload && onMissatge?.(payload));
  canal.on('presence', { event: 'sync' }, () => onPresencia?.(Object.keys(canal.presenceState())));
  canal.subscribe(async st => {
    if (st === 'SUBSCRIBED') { await canal.track({ uid }); onEstat?.('ok'); }
    else if (st === 'CHANNEL_ERROR' || st === 'TIMED_OUT' || st === 'CLOSED') onEstat?.('error');
  });
  return {
    envia: (type, dades = {}) => canal.send({ type: 'broadcast', event: 'm', payload: { type, from: uid, ...dades } }),
    surt: () => { try { sb.removeChannel(canal); } catch {} },
  };
}

export const nouCodi = () => String(1000 + Math.floor(Math.random() * 9000));
