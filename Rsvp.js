// RSVP page: collects the form, saves it, then goes back to the main page.

// ---------------------------------------------------------------
// Supabase goes here later. Replace the body of this function with
// something like:
//
//   const { error } = await supabase.from('rsvps').insert(rsvp);
//   if (error) throw error;
//
// `rsvp` is { name: "mei", status: "coming" | "cant" }.
// ---------------------------------------------------------------
async function saveRsvp(rsvp) {
  // nothing is stored yet
  return rsvp;
}

(function () {
  var form = document.getElementById('rsvp-form');
  var nameEl = document.getElementById('rsvp-name');
  var submitBtn = document.getElementById('rsvp-submit');
  var msg = document.getElementById('rsvp-msg');

  form.addEventListener('submit', function (ev) {
    ev.preventDefault();
    var name = nameEl.value.trim();
    var picked = form.querySelector('input[name=status]:checked');
    if (!name) { nameEl.focus(); return; }
    if (!picked) { msg.textContent = 'pick an option bruh'; return; }

    msg.textContent = '';
    submitBtn.disabled = true;
    saveRsvp({ name: name, status: picked.value }).then(function () {
      try { sessionStorage.setItem('rsvp-name', name); } catch (e) {}
      window.location.href = 'index.html?rsvp=' + encodeURIComponent(picked.value);
    }, function () {
      msg.textContent = "ermmmm.... please try again!";
      submitBtn.disabled = false;
    });
  });
})();