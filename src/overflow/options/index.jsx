import React, { useState } from 'react';
import * as ReactDOM from 'react-dom';

const Options = () => {

  const [subdomains, setSubdomains] = useState(['']);
  const [orgs, setOrgs] = useState(['']);

  function addSubdomain() {
    setSubdomains([ ...subdomains, '']);
  }

  function removeSubdomain(index) {
    subdomains.splice(index, 1)
    setSubdomains([...subdomains]);
  }

  function updateSubdomain(index, value) {
    subdomains[index] = value;
    setSubdomains([...subdomains]);
  }

  function addOrg() {
    setOrgs([ ...orgs, '']);
  }

  function removeOrg(index) {
    orgs.splice(index, 1)
    setOrgs([...orgs]);
  }

  function updateOrg(index, value) {
    orgs[index] = value;
    setOrgs([...orgs]);
  }

  return (
    <div className="Options">
      <form>
        <div className="field-group">
          <label>Split Subdomains</label>
          <p>Domains where each subdomain should be split out</p>
          <div className="list">
            {subdomains.map((subdomain, i) => (
              <div key={`subdomain-${i}`}>
                <input type="text" value={subdomain} onChange={(e) => updateSubdomain(i, e.target.value) } placeholder="google.com" />
                <button type="button" onClick={() => removeSubdomain(i) }>&times;</button>
              </div>
            ))}
          </div>

          <button type="button" onClick={() => addSubdomain() }>Add</button>
        </div>

        <div className="field-group">
          <label>Split Github Organizations</label>
          <p>Split out these Github organizations into their own groups</p>
          <div className="list">
            {orgs.map((org, i) => (
              <div key={`org-${i}`}>
                <input type="text" value={org} onChange={(e) => updateOrg(i, e.target.value) } placeholder="rails" />
                <button type="button" onClick={() => removeOrg(i) }>&times;</button>
              </div>
            ))}
          </div>

          <button type="button" onClick={() => addOrg() }>Add</button>
        </div>

        <button type="submit">Save</button>
      </form>
    </div>
  );
};

ReactDOM.render(<Options />, document.querySelector('main'));
