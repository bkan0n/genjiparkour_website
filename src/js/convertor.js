function selectSection(id) {
  document.querySelectorAll('#mainTabs button').forEach(btn => btn.classList.remove('active'));
  document.querySelectorAll('.convert-map-layout').forEach(sec => sec.style.display = 'none');
  document.getElementById(id).style.display = 'block';
  document.getElementById(id + 'Btn').classList.add('active');
}
