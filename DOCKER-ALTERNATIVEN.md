# Alternativen zu Docker und deren Einsatzgebiete

## Übersicht

Docker ist der bekannteste Container-Runtime, aber es gibt mehrere Alternativen mit unterschiedlichen Schwerpunkten.

---

## Alternativen

### Podman

- **Entwickler:** Red Hat
- **Besonderheit:** Daemonless – läuft ohne zentralen Hintergrundprozess, jeder Container ist ein eigener Prozess
- **Rootless:** Kann komplett ohne Root-Rechte betrieben werden (bessere Sicherheit)
- **CLI-kompatibel:** Befehle sind nahezu identisch zu Docker (`podman build`, `podman run`, …)
- **Einsatz:** Überall dort, wo Docker eingesetzt wird, aber höhere Sicherheitsanforderungen bestehen. Besonders beliebt in Enterprise-Umgebungen und bei Red Hat / Fedora / RHEL.

### containerd

- **Entwickler:** CNCF (Cloud Native Computing Foundation)
- **Besonderheit:** Leichtgewichtige Container-Runtime, die als Backend von Docker und Kubernetes dient
- **Einsatz:** Wird selten direkt von Entwicklern genutzt, sondern als Runtime-Schicht in Kubernetes-Clustern. Kubernetes hat Docker als Runtime abgelöst und nutzt containerd direkt.

### CRI-O

- **Entwickler:** Red Hat / CNCF
- **Besonderheit:** Minimale Container-Runtime, speziell für Kubernetes gebaut
- **Einsatz:** Ausschliesslich als Kubernetes Container Runtime. Kein eigenständiges CLI für Entwickler. Wird in OpenShift als Standard-Runtime verwendet.

### LXC / LXD

- **Besonderheit:** System-Container statt Anwendungs-Container – ein LXC-Container verhält sich eher wie eine leichtgewichtige VM
- **Einsatz:** Wenn man eine vollständige Linux-Umgebung braucht (mit init-System, mehreren Prozessen), nicht nur eine einzelne Anwendung. Gut für Entwicklungsumgebungen oder das Hosting mehrerer Services in einem Container.

### nerdctl

- **Entwickler:** containerd-Projekt
- **Besonderheit:** Docker-kompatibles CLI für containerd
- **Einsatz:** Wenn man containerd direkt nutzen will, aber die gewohnte Docker-CLI-Erfahrung behalten möchte.

---

## Vergleichstabelle

| Tool       | Daemon | Rootless | K8s-Runtime | Docker-kompatibel | Fokus                  |
|------------|--------|----------|-------------|--------------------|------------------------|
| Docker     | Ja     | Teilweise| Nein*       | –                  | Entwicklung & CI/CD    |
| Podman     | Nein   | Ja       | Nein        | Ja                 | Sicherheit & Kompatibilität |
| containerd | Ja     | Ja       | Ja          | Nein (nur via nerdctl) | K8s-Runtime         |
| CRI-O      | Ja     | Nein     | Ja          | Nein               | K8s-Runtime (minimal)  |
| LXC/LXD    | Ja     | Teilweise| Nein        | Nein               | System-Container       |

*Kubernetes hat dockershim seit v1.24 entfernt.

---

## OpenShift

### Was ist OpenShift?

OpenShift ist eine **Enterprise-Kubernetes-Plattform** von Red Hat. Es baut auf Kubernetes auf und erweitert es um Funktionen, die in grossen Unternehmen benötigt werden.

### Kernkomponenten

- **Kubernetes** als Basis für Container-Orchestrierung
- **CRI-O** als Container-Runtime (nicht Docker)
- **Integrierte Image-Registry** zum Speichern von Container-Images
- **Web-Konsole** mit grafischer Oberfläche zur Verwaltung
- **Source-to-Image (S2I):** Kann direkt aus Quellcode ein Container-Image bauen, ohne dass man ein Dockerfile schreiben muss
- **Operators:** Automatisierte Verwaltung von Anwendungen auf Kubernetes

### Unterschied zu "normalem" Kubernetes

| Aspekt               | Kubernetes (vanilla)          | OpenShift                              |
|----------------------|-------------------------------|----------------------------------------|
| Installation         | Manuell (kubeadm, k3s, …)    | Installer mitgeliefert                 |
| Web-UI               | Dashboard (optional)          | Vollständige Web-Konsole               |
| Sicherheit           | Manuell konfigurierbar        | Strikte Defaults (z.B. kein Root)      |
| CI/CD                | Extern (GitHub Actions, …)    | Integrierte Build-Pipelines (Tekton)   |
| Container-Runtime    | containerd                    | CRI-O                                  |
| Support              | Community                     | Red Hat Enterprise Support             |
| Image Builds         | Extern (docker build)         | S2I oder Buildah integriert            |

### Wann OpenShift?

- Wenn ein Unternehmen **Enterprise-Support** und **SLAs** braucht
- Wenn strenge **Sicherheitsanforderungen** gelten (OpenShift erzwingt z.B. standardmässig Non-Root-Container)
- Wenn eine **integrierte CI/CD-Pipeline** gewünscht ist
- Wenn Teams eine **grafische Oberfläche** zur Cluster-Verwaltung bevorzugen

### Wann reicht Kubernetes ohne OpenShift?

- Kleinere Teams mit Kubernetes-Erfahrung
- Wenn Flexibilität bei der Tool-Wahl wichtiger ist als vorgefertigte Lösungen
- Kostensensitive Projekte (OpenShift-Lizenzen sind teuer)
