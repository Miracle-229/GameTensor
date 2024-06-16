import Layout from '@/layouts/Layout';
import React from 'react';
import style from '@/styles/Rules.module.scss';
import { mockRules } from '@/helper/Constants/mockRules';

function Rules() {
  return (
    <Layout title="Rules">
      <div className={style.main}>
        <h1>Rules</h1>
        {mockRules.map((rule) => (
          <div key={rule.id}>
            <h2>{rule.h2}</h2>
            <table>
              <thead>
                <tr>
                  <th>{rule.infraction}</th>
                  <th>{rule.sanctions}</th>
                </tr>
              </thead>
              <tbody>
                {rule.tr.map((tr) => (
                  <tr key={tr.trId}>
                    {tr.td.map((text) => (
                      <td key={text}>{text}</td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ))}
      </div>
    </Layout>
  );
}

export default Rules;
